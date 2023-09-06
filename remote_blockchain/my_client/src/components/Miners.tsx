import Miner from "../interfaces/Miner";

interface Props {
    miners: Array<Miner>;
}

function Miners({miners}: Props) {
  return (
    <>
        <div>Miners:</div>
        <div>
          <ul>
        { 
            miners && 
            miners.map((miner, index) => <li key={index}>{miner.id + ' ' + miner.name}</li>) 
        }
        </ul>
        </div>
    </>
  )
}

export default Miners