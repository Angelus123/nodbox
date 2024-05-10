import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import TypingAnimation from "./TypingAnimation";
import moment from "moment";

// export interface ChatBotProps {
//   brandName: string;
//   botApiUrl: string;
//   click: () => void;
// }

const ChatBot = ({ brandName, botApiUrl, click }) => {
  const [inputValue, setInputValue] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [chatLog, setChatLog] = useState([
    {
      message:
        "Warm greetings! I am here as your dedicated chatbot assistant, ready to assist you with any queries or tasks you may have. ",
      type: "bot",
      time: moment().format("HH:mm:ss"),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messageEl = useRef(null);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleStartChat = () => {
    setChatLog([
      {
        message:
          "Warm greetings! I am here as your dedicated chatbot assistant, ready to assist you with any queries or tasks you may have. ",
        type: "bot",
        time: moment().format("HH:mm:ss"),
      },
    ])
    setDropdown(!dropdown);
  };
  useEffect(() => {
    const handleNodeInserted = (event) => {};
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const target = event.currentTarget ;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }

    return () => {
      if (messageEl.current) {
        messageEl.current.removeEventListener(
          "DOMNodeInserted",
          handleNodeInserted
        );
      }
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentHour = moment().format("HH:mm:ss");

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue, time: currentHour },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = (message) => {
    const url = botApiUrl;

    const data = { message: message };

    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.data.data.fulfillmentText },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className={`absolute md:w-[25rem] w-full md:bottom-24 h-screen md:h-auto lg:h-auto bottom-0 md:right-9 lg:right-10 sm:rounded-0 md:rounded-2xl lg:rounded-xl bg-stone-5 xl:rounded-2xl shadow-md`}
    >
      <div className="flex sm:-rounded-t-0 md:rounded-t-xl lg:rounded-t-xl lg:rounded-y-2xl w-full py-4 bg-black ">
        <h1 className="text-white px-5 font-bold xl">{brandName}</h1>
        <button
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          data-dropdown-placement="bottom-start"
          className="inline-flex  right-10 top-2 absolute self-center items-center p-2 text-sm font-bold text-center text-white bg-black rounded-lg focus:outline-none dark:text-white focus:ring-white"
          type="button"
          onClick={handleDropdown}
        >
          <svg
            className="w-4 h-4 text-white dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>

        <div>
          {dropdown ? (
            <div
              id="dropdownHover"
              className="z-10 absolute right-12 top-10 bg-white divide-y divide-gray-100 rounded-md text-left shadow w-[7rem] dark:bg-gray-700"
            >
              <ul 
                className="text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <span
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-t-md dark:hover:text-white border-1"
                    onClick={handleStartChat}
                  >
                    New Chat
                  </span>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white border-1  border-t-2 border-t-gray-100"
                  >
                    Reflesh
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-b-md dark:hover:text-white  border-1  border-t-2 border-t-gray-100"
                  >
                    End Chat
                  </a>
                </li>
               
              </ul>
            </div>
          ) : null}
        </div>
        <button
          onClick={click}
          className=" absolute text-xl py-2 text-white text-white w-fit px-5 right-0 top-0"
        >
          x
        </button>
      </div>
      <div className="mb-20 ">
        <div
          className="flex flex-col h-[32rem] md:h-[55vh] my-1 space-y-4 w-full overflow-y-scroll overflow-x-hidden  mb-5"
          ref={messageEl}
        >
          {chatLog.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex relative">
                {message.type === "bot" ? (
                  <div className="absolute bottom-0 w-8 h-8 mx-2 bg-black rounded-full bg-no-repeat bg-center bg-70% bg-[url(/src/assets/img/logo.png)]">
                  </div>
                ) : (
                  <div></div>
                )}
                <div
                  className={`${
                    message.type === "user"
                      ? "bg-black text-left text-white mr-2 ml-4 rounded-t-xl rounded-bl-xl"
                      : "bg-customBlue text-left rounded-t-xl mx-2 mr-4 ml-12 rounded-br-xl"
                  } px-4  py-1 break-keep text-black max-w-sm`}
                >
                  {message.type === "user" ? message.message : message.message}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div key={chatLog.length} className="flex relative">
              <div className="absolute bottom-0 w-8 h-8 mx-2 bg-black  rounded-full bg-no-repeat bg-center bg-70% bg-[url(/src/assets/img/logo.png)]">
                  </div>
              <div className="bg-customBlue text-left rounded-t-xl  mr-4 ml-12 mx-2 p-3 mr-4 rounded-br-xl">
                <TypingAnimation />
              </div>
            </div>
          )}
        </div>
      </div>
      <></>
      <form
        onSubmit={handleSubmit}
        className="absolute mb-3 sm:bottom-0 w-full flex-none p-3 bottom-0 border-1  border-t-2 border-t-gray-100"
      >
        <div className="flex rounded-lg ">
          <input
            type="text"
            className="flex-grow px-4 py-2 bg-transparent text-gray-700 focus:outline-none"
            placeholder="Type Here..."
            value={inputValue}
            required
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="srounded-lg px-4 py-2 text-white font-semibold focus:outline-none transition-colors duration-300 bg-no-repeat bg-center bg-70% bg-[url(/src/assets/img/send.png)]"
          ></button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
