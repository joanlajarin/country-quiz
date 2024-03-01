export default function Number({ id, check, handleOnClick}) {

    const handleNumber = () => {
        handleOnClick(id )
    }

    return(
        <div 
            id={id}
            className={`size-[40px] rounded-full flex justify-center items-center  ${check ? 'bg-gradient-to-r from-[#E65895] to-[#BC6BE8]' : 'bg-[#393F6E]'}`}
            onClick={handleNumber}
        >
        <span>{id + 1}</span>
      </div>
    )
}