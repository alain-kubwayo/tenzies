const Die = ({ value, isHeld, id, holdDice }) => {
    return ( 
        <div 
            className={`flex items-center justify-center rounded-lg cursor-pointer w-14 h-14 ${isHeld ? 'bg-sky-900 text-white' : ''}`} 
            style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)' }}
            onClick={()=>holdDice(id)}
        >
            <h2 className="text-2xl font-bold">{value}</h2>    
        </div>
    );
}
 
export default Die;