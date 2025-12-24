import React, { useState, useEffect, useRef } from "react";
import { database as db } from "./firebase";
import { ref, onValue, push } from "firebase/database";

const PAGE_SIZE = 10;

export default function UniverseTab({ universe }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [temporalFreeze, setTemporalFreeze] = useState(false);
  const [pulse, setPulse] = useState(false);

  const bufferRef = useRef([]);
  const scrollRef = useRef(null);
  const writeQueue = useRef([]);
  const debounceRef = useRef(null);

  // Restore state
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`nv_${universe}`));
    if (saved) {
      setItems(saved.items || []);
      setPage(saved.page || 1);
      setQuery(saved.query || "");
      setTemporalFreeze(saved.temporalFreeze || false);
    }
  }, [universe]);

  // Persist state
  useEffect(() => {
    localStorage.setItem(
      `nv_${universe}`,
      JSON.stringify({ items, page, query, temporalFreeze })
    );
  }, [items, page, query, temporalFreeze, universe]);

  // Scroll memory
  useEffect(() => {
    const savedScroll = localStorage.getItem(`nv_scroll_${universe}`);
    if (savedScroll && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(savedScroll);
    }
  }, [universe]);

  const handleScroll = () => {
    localStorage.setItem(`nv_scroll_${universe}`, scrollRef.current.scrollTop);
  };

  // Realtime listener
  useEffect(() => {
    const dbRef = ref(db, universe);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val() || {};
      let itemList = Object.entries(data).map(([id, value]) => ({ id, ...value }));

      // Search filter
      if (query.trim()) {
        itemList = itemList.filter((i) =>
          i.name.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Pulse glow
      setPulse(true);
      setTimeout(() => setPulse(false), 500);

      if (temporalFreeze) {
        bufferRef.current = [...bufferRef.current, ...itemList];
      } else {
        setItems(itemList);
      }
    });

    return () => unsubscribe();
  }, [universe, temporalFreeze, query]);

  const flushBuffer = () => {
    setItems((prev) => [...prev, ...bufferRef.current]);
    bufferRef.current = [];
  };

  // Add new item
  const addItem = () => {
    const newItem = { name: `${universe} #${Date.now()}` };
    try {
      push(ref(db, universe), newItem);
    } catch {
      writeQueue.current.push({ universe, item: newItem });
    }
  };

  // Offline flush
  useEffect(() => {
    const handleOnline = () => {
      writeQueue.current.forEach(({ universe, item }) => push(ref(db, universe), item));
      writeQueue.current = [];
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  // Pagination
  const paginatedItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(items.length / PAGE_SIZE);

  // Debounced search
  const handleSearch = (e) => {
    clearTimeout(debounceRef.current);
    const value = e.target.value;
    debounceRef.current = setTimeout(() => setQuery(value), 300);
  };

  return (
    <div className="slide-in">
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <button
          onClick={addItem}
          className="nebula-button"
        >
          Add {universe}
        </button>

        <input
          type="text"
          placeholder={`Search ${universe}`}
          onChange={handleSearch}
          className="nebula-input flex-1 min-w-0"
        />

        <label className="flex items-center gap-2 text-sm">
          Temporal Freeze
          <input
            type="checkbox"
            checked={temporalFreeze}
            onChange={(e) => {
              setTemporalFreeze(e.target.checked);
              if (!e.target.checked) flushBuffer();
            }}
            className="w-4 h-4 accent-current"
          />
        </label>

        <div
          className={`w-4 h-4 rounded-full ${
            pulse ? "pulse-glow bg-green-400" : "bg-gray-600"
          }`}
        />
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="nebula-card p-4 h-80 overflow-y-auto nebula-scrollbar mb-6"
      >
        {paginatedItems.map((item) => (
          <div
            key={item.id}
            className="p-3 mb-2 border-b border-gray-700 hover:bg-gray-800 transition rounded nebula-card"
          >
            {item.name}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="nebula-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {page} / {totalPages || 1}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="nebula-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
