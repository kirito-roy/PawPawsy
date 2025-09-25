import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@material-tailwind/react";
import { useAuth } from "@/components/auth/AuthContext"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

function Unauthorised() {
  const { isAuthenticated, userRole } = useAuth(); // Destructure the login function from useAuth\
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const handleRef = useRef(null);
  const dragStartData = useRef({ angle: 0, rotation: 0 });

  const go_to_dashboard_or_login = useCallback(() => {
    try {
      if (isAuthenticated == true) {
        if (userRole() === "admin") {
          navigate("/admin/admin-home");
        } else if (userRole() === "user") {
          navigate("/dashboard/Explore");
        } else {
          navigate("/auth/sign-in");
        }
      } else {
        navigate("/auth/sign-in");
      }
    } catch (e) {
      console.error("Error navigating to dashboard or login:", e);
    }
  }, [isAuthenticated, userRole, navigate]);
  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging || !handleRef.current) return;

      const handleRect = handleRef.current.getBoundingClientRect();
      const pivotX = handleRect.left; // As per origin-[0px_4px]
      const pivotY = handleRect.top + 4;

      const currentAngle =
        Math.atan2(e.clientY - pivotY, e.clientX - pivotX) * (180 / Math.PI);
      const deltaAngle = currentAngle - dragStartData.current.angle;

      let newRotation = dragStartData.current.rotation + deltaAngle;
      // Clamp the rotation between 0 and 45 degrees
      newRotation = Math.max(0, Math.min(newRotation, 45));
      setRotation(newRotation);

      // If handle is fully rotated, trigger navigation
      if (newRotation === 45) {
        go_to_dashboard_or_login();
      }
    },
    [isDragging, go_to_dashboard_or_login]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    setRotation(0); // Spring back to original position
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return (
    <>
      <style>
        {`
          @keyframes leaf {
            0% { transform: scaleX(1); }
            5% { transform: scaleX(0.2); }
            70% { transform: scaleX(0.2); }
            75% { transform: scaleX(1); }
            100% { transform: scaleX(1); }
          }
          @keyframes eye {
            0% { opacity: 0; transform: translateX(0) scaleY(1); }
            5% { opacity: 0; }
            15% { opacity: 1; transform: translateX(0) scaleY(1); }
            20% { transform: translateX(15px) scaleY(1); }
            35% { transform: translateX(15px) scaleY(1); }
            40% { transform: translateX(-15px) scaleY(1); }
            60% { transform: translateX(-15px) scaleY(1); }
            65% { transform: translateX(0) scaleY(1); }
            /* Blink animation */
            80% { transform: translateX(0) scaleY(1); }
            81% { transform: translateX(0) scaleY(0.1); }
            82% { transform: translateX(0) scaleY(1); }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 2px #EBF3FC, 0 0 5px #EBF3FC; }
            50% { box-shadow: 0 0 8px #EBF3FC, 0 0 12px #EBF3FC; }
          }

          @keyframes flux {
            0%, 100% {
              text-shadow: 0 0 5px #00FFC6, 0 0 15px #00FFC6, 0 0 50px #00FFC6, 0 0 50px #00FFC6, 0 0 2px #B9FFE8, 2px 2px 3px #12E29C;
              color: #4BFFEF;
            }
            50% {
              text-shadow: 0 0 3px #00B58D, 0 0 7px #00B58D, 0 0 25px #00B58D, 0 0 25px #00B58D, 0 0 2px #00B58D, 2px 2px 3px #006A60;
              color: #63D3AE;
            }
          }
          .animate-eye { animation: eye 7s ease-in-out infinite; }
          .animate-leaf { animation: leaf 7s infinite; }
          .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
          .animate-flux { animation: flux 2s linear infinite; }
        `}
      </style>

      <div className="bg-[#1C2127] flex items-center justify-center min-h-screen relative p-4">
        <div className="w-full md:grid md:grid-cols-2 md:gap-8 max-w-7xl">
          {/* Left side content (Messages + Button) */}
          <div className="flex flex-col items-center justify-center mb-8 text-center md:items-start md:text-left md:mb-0">
            <div className="font-poppins text-[30px] text-white font-medium">
              You are not authorized.
            </div>
            <div className="max-w-lg mt-2 text-lg font-light text-white font-poppins">
              You tried to access a page you did not have prior authorization
              for.
            </div>

            {/* Dashboard Button */}
            <Button
              onClick={go_to_dashboard_or_login}
              className="mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#00B58D] hover:bg-[#009a78] rounded-lg shadow transition-all duration-200"
            >
              Go to Dashboard
            </Button>
          </div>

          {/* Right side content (Animation) */}
          <div className="flex flex-col items-center justify-center">
            <div className="font-varela-round text-[90px] text-[#5BE0B3] tracking-[3px] animate-flux text-center shadow-lg">
              401
            </div>
            {/* Animated Door */}
            <div className="h-[495px] w-[295px] rounded-t-[90px] bg-[#8594A5] flex justify-center items-center mt-4">
              <div className="h-[450px] w-[250px] rounded-t-[70px] bg-[#A0AEC0] relative">
                {/* Handle Assembly */}
                <div className="absolute mt-[220px] ml-[20px]">
                  {/* Backplate - does not rotate */}
                  <div className="absolute h-[70px] w-[25px] bg-[#CBD8E6] rounded-[4px]"></div>
                  {/* Handle - rotates */}
                  <div
                    ref={handleRef}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      if (!handleRef.current) return;
                      setIsDragging(true);
                      const handleRect = handleRef.current.getBoundingClientRect();
                      const pivotX = handleRect.left;
                      const pivotY = handleRect.top + 4;
                      const angle = Math.atan2(e.clientY - pivotY, e.clientX - pivotX) * (180 / Math.PI);
                      dragStartData.current = { angle, rotation };
                    }}
                    className="absolute mt-[30px] ml-[10px] origin-[0px_4px] cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <div className="h-[8px] w-[50px] rounded-[4px] bg-[#EBF3FC] animate-pulse-glow"></div>
                  </div>
                </div>
                <div className="h-10 w-[130px] bg-[#1C2127] rounded-sm mx-auto mt-[80px] relative">
                  <div className="absolute top-[15px] left-[25px] h-[5px] w-[15px] rounded-full bg-white animate-eye"></div>
                  <div className="absolute top-[15px] left-[65px] h-[5px] w-[15px] rounded-full bg-white animate-eye"></div>
                  <div className="h-10 w-[130px] bg-[#8594A5] rounded-sm animate-leaf origin-right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Unauthorised;
