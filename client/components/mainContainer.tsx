export default function MainContainer() {
  return (
    <div className="bg-[#D34836]  rounded-2xl flex flex-col items-center justify-center  pt-8 pb-16 px-32 w-[700px]">
      <h1 className="text-white  whitespace-nowrap text-5xl font-bold mb-6 text-center ">
        Экранынды түсіріп
        <br />
        Әдемі жазбалар ал
      </h1>
      <div className="text-white text-8xl font-bold mb-8">00:00</div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-8">
        <div className="bg-green-600 h-2.5 rounded-full"></div>
      </div>
      <button className="bg-green-500 text-white px-24 py-4 rounded-md text-lg hover:bg-green-600">
        ▶️ Бастау
      </button>
    </div>
  );
}
