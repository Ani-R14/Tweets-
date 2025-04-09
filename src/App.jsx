import { useState } from "react";
import { Menu, X } from "lucide-react";

function App() {
  const [inputTweet, setInputTweet] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const showDisasterMap = async () => {
    const newTab = window.open("", "_blank");

    try {
      const response = await fetch("https://tweets-backend-ep3k.onrender.com/generate-map", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweets: [{ text: inputTweet, location: inputLocation }],
        }),
      });

      if (response.ok) {
        const mapHtml = await response.text();
        newTab.document.write(mapHtml);
        newTab.document.close();
      } else {
        newTab.close();
        alert("Failed to generate map: " + response.statusText);
      }
    } catch (error) {
      newTab.close();
      alert("Network error while generating map: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#6a1b9a] to-[#b084f5] text-white text-center p-5 relative">
      {/* Navbar */}
      <nav className="w-full fixed top-0 bg-[#1b0137] p-4 flex justify-between items-center shadow-lg z-10">
        <button
          className="text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <h1
          className="text-3xl font-bold text-[#b084f5] cursor-pointer ml-auto transition-transform hover:scale-110"
          onClick={() => setCurrentPage("home")}
        >
          Disaster Response
        </h1>
      </nav>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-[#1b0137] to-[#4c006e] transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-xl z-20`}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} />
        </button>

        <ul className="mt-16 text-left text-white p-4 space-y-6">
          <li
            className="hover:text-[#b084f5] cursor-pointer text-xl font-semibold transition duration-300"
            onClick={() => setCurrentPage("home")}
          >
            Home
          </li>
          <li
            className="hover:text-[#b084f5] cursor-pointer text-xl font-semibold transition duration-300"
            onClick={() => setCurrentPage("tweets")}
          >
            Classify Tweet
          </li>
          <li
            className="hover:text-[#b084f5] cursor-pointer text-xl font-semibold transition duration-300"
            onClick={() => setCurrentPage("about")}
          >
            About Us
          </li>
        </ul>
      </div>

      {/* Page Content */}
      <main className="w-full max-w-xl mt-20 z-0">
        {currentPage === "home" && (
          <div>
            <h2 className="text-6xl font-bold text-gray-100">Welcome</h2>
            <p className="text-gray-300 mt-3">
              A system for disaster response classification.
            </p>
            <button
              className="mt-5 px-6 py-3 bg-gradient-to-r from-[#b084f5] to-[#9c27b0] text-white font-bold rounded-full shadow-lg hover:bg-gradient-to-l"
              onClick={() => setCurrentPage("tweets")}
            >
              Start Classification
            </button>
          </div>
        )}

        {currentPage === "tweets" && (
          <div>
            <h2 className="text-4xl font-bold text-gray-100">
              Enter a Tweet for Classification
            </h2>
            <textarea
              value={inputTweet}
              onChange={(e) => setInputTweet(e.target.value)}
              className="w-full p-3 mt-5 rounded text-black"
              rows={4}
              placeholder="Type your tweet here..."
            />
            <input
              type="text"
              value={inputLocation}
              onChange={(e) => setInputLocation(e.target.value)}
              className="w-full p-3 mt-3 rounded text-black"
              placeholder="Enter tweet location (e.g., Mumbai)"
            />
            <button
              className="mt-5 px-6 py-3 bg-gradient-to-r from-[#b084f5] to-[#9c27b0] text-white font-bold rounded-full shadow-lg hover:bg-gradient-to-l"
              onClick={showDisasterMap}
              disabled={!inputTweet || !inputLocation}
            >
              Classify & Show Map
            </button>
          </div>
        )}

        {currentPage === "about" && (
          <div>
            <h2 className="text-4xl font-bold text-gray-100">About Us</h2>
            <p className="text-gray-300 mt-3">
              This project classifies tweets related to disasters using AI.
              It helps in identifying emergency situations and responding efficiently.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
