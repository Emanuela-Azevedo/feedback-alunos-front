import './SimpleAdvertisementCard.css';

function SimpleAdvertisementCard({
    id,
    creationTime,
    itemsCount,
    description,
  }) {

  const datetime = new Date(creationTime);

  return (
    <>
      <div className='advertisement-card'>
        <div className='card-header'>
          <h2 id='destaque'>Anúncio {id}</h2>
          <p id='texto-comum'>Criado em {datetime.toLocaleString()}</p>       
          <p id='texto-comum'>Quantidade de itens no anúncio: {itemsCount}</p>
        </div>
        <div className='card_subinfo'>
          <p id='texto-comum'>Descrição: {description}</p>
        </div>
      </div>
    </>
  );
}

export default SimpleAdvertisementCard;