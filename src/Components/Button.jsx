import "../App.css";

function GreenButton({ text, count }) {
    const isDisabled = count == 0;

    return <button
        disabled={isDisabled}
        className={`font-mono font-medium border-2 bg-[#5cf7ae] px-6 py-3 text-xl text-black transition-all  tracking-wider ${isDisabled ? "btn-disable" : "cursor-pointer hover:bg-black hover:text-[#5cf7ae]"}`}
        onClick={() => count > 0 ? alert('Initiating...') : ''}
    >{text}</button>
}
export default GreenButton