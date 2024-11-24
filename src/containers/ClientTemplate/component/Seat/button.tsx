
const ButtonNext = ({onclick}: {onclick: () => void }) => {
    
  return (
       <button
          onClick={onclick}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors duration-200"
        >
          Tiếp tục
        </button>
  )
}

export default ButtonNext
