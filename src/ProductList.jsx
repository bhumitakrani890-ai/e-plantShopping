import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores and purifies air.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114441_1280.jpg", description: "Adds humidity and purifies toxins.", cost: "$20" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/14/03/rubber-plant-4851078_1280.jpg", description: "Cleans indoor air effectively.", cost: "$22" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/05/14/09/aloe-vera-3292942_1280.jpg", description: "Air cleaning and medicinal properties.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/10/22/lavender-828499_1280.jpg", description: "Calming scent for relaxation.", cost: "$20" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/06/10/17/40/jasmine-3466917_1280.jpg", description: "Sweet floral fragrance.", cost: "$25" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2016/09/08/17/57/rosemary-1655078_1280.jpg", description: "Aromatic herb for cooking and scent.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/26/17/58/mint-1163013_1280.jpg", description: "Refreshing and uplifting aroma.", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2017/07/07/12/31/eucalyptus-2481358_1280.jpg", description: "Fresh minty scent.", cost: "$18" },
        { name: "Gardenia", image: "https://cdn.pixabay.com/photo/2017/05/16/21/22/gardenia-2318974_1280.jpg", description: "Intense sweet fragrance.", cost: "$30" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Tulsi (Holy Basil)", image: "https://cdn.pixabay.com/photo/2021/01/18/17/42/tulsi-5928812_1280.jpg", description: "Traditional medicinal herb.", cost: "$12" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/05/11/19/44/peppermint-2305192_1280.jpg", description: "Helps digestion and headaches.", cost: "$14" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/02/09/44/chamomile-1562985_1280.jpg", description: "Soothes nerves and aids sleep.", cost: "$16" },
        { name: "Lemongrass", image: "https://cdn.pixabay.com/photo/2017/06/16/18/29/lemongrass-2410058_1280.jpg", description: "Rich in antioxidants.", cost: "$12" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2017/05/23/16/23/thyme-2337671_1280.jpg", description: "Antimicrobial properties.", cost: "$11" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2017/07/18/18/24/calendula-2516629_1280.jpg", description: "Soothes skin irritations.", cost: "$13" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#4CAF50', color: 'white', alignItems: 'center' }}>
        <h2>Paradise Nursery</h2>
        <button onClick={() => setShowCart(true)} style={{ backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>
          🛒 Cart ({totalCartQuantity})
        </button>
      </div>

      {!showCart ? (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map((category, index) => (
            <div key={index} style={{ marginBottom: '30px' }}>
              <h2 style={{ textAlign: 'center', color: '#2e7d32' }}>{category.category}</h2>
              <div className="plant-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {category.plants.map((plant, pIndex) => {
                  const added = isPlantInCart(plant.name);
                  return (
                    <div className="product-card" key={pIndex} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '250px', textAlign: 'center', backgroundColor: '#fff' }}>
                      <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px' }} />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p style={{ fontWeight: 'bold' }}>{plant.cost}</p>
                      <button 
                        onClick={() => handleAddToCart(plant)} 
                        disabled={added}
                        style={{ padding: '10px 15px', backgroundColor: added ? '#cccccc' : '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: added ? 'not-allowed' : 'pointer' }}
                      >
                        {added ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
