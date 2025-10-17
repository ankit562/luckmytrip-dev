import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TripCarosel = () => {
    const navigator = useNavigate();
    useEffect(() => {
        
        function setupCarousel(trackId, leftBtnId, rightBtnId, numberEl = null, syncTrack = null) {
            const track = document.getElementById(trackId);
            if (!track) return;
            const viewport = track.parentElement;
            const leftBtn = leftBtnId ? document.getElementById(leftBtnId) : null;
            const rightBtn = rightBtnId ? document.getElementById(rightBtnId) : null;
            const slides = track.children.length;
            let index = 0;

            if (viewport) viewport.style.touchAction = "pan-y";
            track.style.willChange = "transform";
            track.style.userSelect = "none";
            track.style.webkitUserDrag = "none";

            function getSlideWidth() {
                return viewport ? viewport.clientWidth : track.clientWidth || 0;
            }

            let currentTransition = "transform 0.6s ease-in-out";

            function updateSlide() {
                const w = getSlideWidth();
                track.style.transition = currentTransition;
                track.style.transform = `translateX(-${index * w}px)`;
                if (syncTrack) {
                    const syncW =
                        syncTrack.parentElement?.clientWidth ||
                        syncTrack.children[0]?.offsetWidth ||
                        0;
                    syncTrack.style.transition = currentTransition;
                    syncTrack.style.transform = `translateX(-${index * syncW}px)`;
                }
                if (numberEl) numberEl.textContent = String(index + 1).padStart(2, "0");

                if (leftBtn && rightBtn) {
                    if (index === 0) {
                        leftBtn.classList.add("text-gray-300");
                        leftBtn.classList.remove("text-gray-800");
                    } else {
                        leftBtn.classList.add("text-gray-800");
                        leftBtn.classList.remove("text-gray-300");
                    }
                    if (index === slides - 1) {
                        rightBtn.classList.add("text-gray-300");
                        rightBtn.classList.remove("text-gray-800");
                    } else {
                        rightBtn.classList.add("text-gray-800");
                        rightBtn.classList.remove("text-gray-300");
                    }
                }
            }

            if (rightBtn)
                rightBtn.addEventListener("click", () => {
                    if (index < slides - 1) {
                        index++;
                    } else {
                        index = 0;
                    }
                    updateSlide();
                });

            if (leftBtn)
                leftBtn.addEventListener("click", () => {
                    if (index > 0) {
                        index--;
                    } else {
                        index = slides - 1;
                    }
                    updateSlide();
                });

            if (trackId === "smTrack" && viewport) {
                let isDragging = false;
                let startX = 0;
                let lastX = 0;
                let prevTranslate = 0;
                let syncPrev = 0;
                let slideWidth = getSlideWidth();
                let syncSlideWidth = syncTrack?.parentElement?.clientWidth || 0;
                let currentTransition = "transform 0.6s ease";

                function startPointer(e) {
                    if (e.pointerType === "mouse" && e.button !== 0) return;
                    slideWidth = getSlideWidth();
                    syncSlideWidth = syncTrack?.parentElement?.clientWidth || syncSlideWidth;
                    prevTranslate = -index * slideWidth;
                    syncPrev = -index * syncSlideWidth;

                    isDragging = true;
                    startX = e.clientX;
                    lastX = startX;
                    currentTransition = "none";
                    track.style.transition = "none";
                    if (syncTrack) syncTrack.style.transition = "none";
                    e.target.setPointerCapture?.(e.pointerId);
                }

                function movePointer(e) {
                    if (!isDragging) return;
                    lastX = e.clientX;
                    const dx = lastX - startX;
                    const translate = prevTranslate + dx;
                    track.style.transform = `translateX(${translate}px)`;
                    if (syncTrack) {
                        const factor = syncSlideWidth / slideWidth;
                        syncTrack.style.transform = `translateX(${syncPrev + dx * factor}px)`;
                    }
                    e.preventDefault();
                }

                function endPointer(e) {
                    if (!isDragging) return;
                    isDragging = false;
                    e.target.releasePointerCapture?.(e.pointerId);

                    const dx = lastX - startX;
                    const threshold = Math.max(40, Math.round(slideWidth * 0.15));
                    currentTransition = "transform 0.35s ease";
                    if (dx < -threshold && index < slides - 1) index++;
                    else if (dx > threshold && index > 0) index--;
                    updateSlide();
                }

                viewport.addEventListener("pointerdown", startPointer, { passive: true });
                viewport.addEventListener("pointermove", movePointer, { passive: false });
                viewport.addEventListener("pointerup", endPointer);
                viewport.addEventListener("pointercancel", endPointer);
            }

            window.addEventListener("resize", updateSlide);
            updateSlide();
        }

        setupCarousel(
            "lgTrack",
            "scrollLeft",
            "scrollRight",
            document.getElementById("number"),
            document.getElementById("lgRightTrack")
        );
        setupCarousel("smTrack", "scrollLeftBtn", "scrollRightBtn");
    }, []);

    const handledubai=()=>{
        toast.success("Redirecting to Ticket Page");
        navigator("/ticket", { state: { ticketType: "dubai", qty: 1 } }); 
    }

    return (
        <div className="bg-[#edf8fd] flex justify-center items-center min-h-screen lg:mt-0 md:mt-0  mt-[-10%]">
            <div className="max-w-7xl w-full flex flex-col lg:flex-row lg:px-32 px-5 mx-auto ">
                {/* Left Section */}
                <div className="w-full md:w-[70%] flex flex-col items-center lg:gap-6 relative hidden lg:block">
                    <div className="absolute top-0 lg:left-[-85px] left-[20px] w-full z-20">
                        <h1 className="font-bold text-5xl leading-[1] mt-3">
                            <span className="font-berlin text-stroke-red text-[30px] lg:text-[62px]">
                                Win Your
                            </span>
                            <br />
                            <span className="text-[#19c6b2] font-berlin text-[30px] lg:text-[60px]">
                                Dream
                            </span>
                            <br />
                            <span className="text-[#19c6b2] font-berlin text-[30px] lg:text-[50px]">
                                Trip
                            </span>
                        </h1>
                    </div>

                    <div className="overflow-hidden w-full mx-auto md:max-w-[650px] rounded-[30px]">
                        <div id="lgTrack" className="slider-track flex">
                            <img
                                src="/images/MaskGroup.png"
                                className="w-full flex-shrink-0 object-cover rounded-[30px]"
                                alt="Slide 1"
                            />
                            <img
                                src="/images/MaskGroup.png"
                                className="w-full flex-shrink-0 object-cover rounded-[30px]"
                                alt="Slide 2"
                            />
                            <img
                                src="/images/MaskGroup.png"
                                className="w-full flex-shrink-0 object-cover rounded-[30px]"
                                alt="Slide 3"
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-0 lg:left-[-135px] w-full flex gap-2 items-center">
                        <span
                            id="scrollLeft"
                            className="mx-3 cursor-pointer text-gray-400 text-3xl py-1 px-2 rounded transition"
                        >
                            &larr;
                        </span>
                        <span id="number" className="text-xl">
                            01
                        </span>
                        <span
                            id="scrollRight"
                            className="mx-3 cursor-pointer text-gray-700 text-3xl py-1 px-2 rounded transition"
                        >
                            &rarr;
                        </span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="lg:w-[30%] w-full flex flex-col py-0 items-start">
                    <div className="relative mb-5 w-full">
                        <button
                            id="scrollLeftBtn"
                            className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 py-2 px-3 bg-white/40 rounded-full shadow lg:hidden"
                        >
                            &#8592;
                        </button>
                        <button
                            id="scrollRightBtn"
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 py-2 px-3 bg-white/40 rounded-full shadow lg:hidden"
                        >
                            &#8594;
                        </button>

                        <div
                            id="smViewport"
                            className="overflow-hidden w-full rounded-[20px] lg:hidden"
                            style={{ touchAction: "pan-y pinch-zoom" }}
                        >
                            <div id="smTrack" className="slider-track flex">
                                <div className="w-full flex-shrink-0">
                                    <img src="/images/MaskGroup2.png" className="w-full object-cover" alt="Small 1" />
                                </div>
                                <div className="w-full flex-shrink-0">
                                    <img src="/images/MaskGroup2.png" className="w-full object-cover" alt="Small 2" />
                                </div>
                                <div className="w-full flex-shrink-0">
                                    <img src="/images/MaskGroup2.png" className="w-full object-cover" alt="Small 3" />
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden w-full rounded-[20px] hidden lg:block">
                            <div id="lgRightTrack" className="slider-track flex">
                                <img src="/images/MaskGroup2.png" className="w-full flex-shrink-0 object-cover" alt="Right 1" />
                                <img src="/images/MaskGroup2.png" className="w-full flex-shrink-0 object-cover" alt="Right 2" />
                                <img src="/images/MaskGroup2.png" className="w-full flex-shrink-0 object-cover" alt="Right 3" />
                            </div>
                        </div>
                    </div>

                    <div className="lg:mb-6 mb-3">
                        <h2 className="text-4xl font-bold lg:block flex flex-col space-y-1">
                            <span className="text-[#0d3559] font-open-sans font-extrabold text-3xl lg:text-[60px]">
                                FLY TO
                            </span>
                            <span className="text-[#f6b21d] font-open-sans font-extrabold text-xl lg:text-[38px]">
                                DUBAI
                            </span>
                        </h2>
                        <button
                             onClick={handledubai} 
                            className="lg:mt-7 mt-2 bg-[#8ac541] text-white 
                            lg:py-5 lg:px-6 py-2 px-3 text-sm lg:text-2xl rounded-[100%] 
                            shadow-lg hover:bg-[#3d660b] transition font-bold"
                        >
                            ➜
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripCarosel;
