import { CircleCheck, CircleX } from "lucide-react";

export default function TravelCard({
    title,
    logo,
    features = [],
    restrictions = [],
    buttonText = "LEARN MORE",
}) {
    return (
        <div className="bg-white rounded-2xl shadow-xl px-4 py-3 max-w-xl w-full mx-auto flex flex-col justify-between min-h-[350px]">
            <div className="flex justify-center items-center gap-4">
                <div className="flex items-center space-x-2 mb-4">
                    {logo}
                    <span className="font-bold text-2xl">{title}</span>
                </div>
                <div>
                    <ul className="space-y-3 mb-8">
                        {features.map((text, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-800 font-medium text-lg">
                                <CircleCheck className="text-green-500 md:w-6 md:h-6 h-4 w-4" strokeWidth={3} />
                                <p className="text-sm md:text-base">
                                    {text}

                                </p>
                            </li>
                        ))}
                    </ul>

                </div>

            </div>
            <hr className="my-2 border-pink-200" />
            <div className="flex justify-between items-center my-4">
                {restrictions.map((text, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-medium text-sm md:text-lg text-gray-600">
                        <CircleX className="text-pink-500 md:w-6 md:h-6 h-4 w-4" strokeWidth={3} />
                        {text}
                    </div>
                ))}
            </div>
            <div className="flex justify-end">
                <button className=" mt-3 bg-teal-500 hover:bg-teal-600 rounded-xl
                 py-2 md:py-3 text-sm md:text-xl font-bold text-white shadow transition w-40  right-0">
                    {buttonText}
                </button>

            </div>

        </div>
    );
}
