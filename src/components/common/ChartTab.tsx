
import useUtilsStore from "../../stores/useUtilsStore";

const ChartTab: React.FC = () => {
  const {days, setDays} = useUtilsStore()


  const getButtonClass = (option: 1 | 7 | 14) =>
    days === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => setDays(1)}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          1
        )}`}
      >
        Giornaliero
      </button>

      <button
        onClick={() => setDays(7)}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          7
        )}`}
      >
        Settimanale
      </button>

      <button
        onClick={() => setDays(14)}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          14
        )}`}
      >
        Bisettimanale
      </button>
    </div>
  );
};

export default ChartTab;
