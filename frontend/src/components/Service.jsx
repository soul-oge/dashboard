import React, { useState } from "react";
import Coingecko from "./widgets/Coingecko";
import Currency from "./widgets/Currency";
import News from "./widgets/News";
import Todo from "./widgets/Todo";
import Weather from "./widgets/Weather";

export default function Services() {
  const [layout, setLayout] = useState([]);
  // const [loading, setLoading] = useState(true);

  const widgetOptions = [
    { key: "coingecko", label: "Coingecko" },
    { key: "currency", label: "Currency" },
    { key: "news", label: "News" },
    { key: "todo", label: "Todo" },
    { key: "weather", label: "Weather" },
  ];

  const saveLayout = (newLayout) => {
    setLayout(newLayout);
    console.log("Layout sauvegardé :", newLayout);
  };

  const addWidget = (type) => {
    const newLayout = [...layout, type];
    saveLayout(newLayout);
  };

  const removeAt = (index) => {
    const newLayout = layout.filter((_, i) => i !== index);
    saveLayout(newLayout);
  };

  const move = (from, to) => {
    if (to < 0 || to >= layout.length) return;
    const copy = [...layout];
    const [item] = copy.splice(from, 1);
    copy.splice(to, 0, item);
    saveLayout(copy);
  };

  const renderWidget = (type, idx) => {
    const commonProps = {
      key: `${type}-${idx}`,
      index: idx,
      remove: () => removeAt(idx),
      move,
    };

    switch (type) {
      case "weather":
        return <Weather {...commonProps} />;
      case "coingecko":
        return <Coingecko {...commonProps} />;
      case "todo":
        return <Todo {...commonProps} />;
      case "news":
        return <News {...commonProps} />;
      case "currency":
        return <Currency {...commonProps} />;
      default:
        return (
          <div {...commonProps} className="p-4 border rounded bg-white">
            Unknown widget: {type}
          </div>
        );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 mt-4">Widgets</h2>
      <div className="flex gap-2 mb-4 justify-center">
        {widgetOptions.map((w) => (
          <button
            key={w.key}
            onClick={() => addWidget(w.key)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Ajouter {w.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 items-center gap-4">
        {layout.length === 0 ? (
          <p className="text-gray-500">No widget for now.</p>
        ) : (
          layout.map((type, idx) => renderWidget(type, idx))
        )}
      </div>
    </div>
  );
}