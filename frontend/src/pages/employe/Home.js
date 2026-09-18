import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import './Home.css'; // ou le bon chemin vers ton fichier CSS
import vapeIcon from '../../assets/img/vape.png';
import liquideIcon from '../../assets/img/liquide.png';
import accessoireIcon from '../../assets/img/accessoire.png';
import serviceIcon from '../../assets/img/service.png';
import fruiteIcon from '../../assets/img/fruite.jpeg';
import gourmandIcon from '../../assets/img/gourmand.png';
import fruiteBIcon from '../../assets/img/fruiteB.jpg';
import gourmandBIcon from '../../assets/img/gourmandB.jpg';
import VenteVapeModal from './vente/VenteVapeModal';
import VenteLiquideBFModal from './vente/VenteLiquideBFModal';
import VenteLiquideBGModal from './vente/VenteLiquideBGModal';
import VenteLiquideDFModal from './vente/VenteLiquideDFModal';
import VenteLiquideDGModal from './vente/VenteLiquideDGModal';
import VenteAccessoireModal from './vente/VenteAccessoireModal';
import ServiceModal from './vente/ServiceModal';
import axios from 'axios';
import Clock from '../components/Clock';

const Home = () => {
 const [showVapeModal, setShowVapeModal] = useState(false);
 const [showLiquideModal, setShowLiquideModal] = useState(false);
 const [showAccessoireModal, setShowAccessoireModal] = useState(false);
 const [showServiceModal, setShowServiceModal] = useState(false);
 const [showLiquideBFModal, setShowLiquideBFModal] = useState(false);
 const [showLiquideBGModal, setShowLiquideBGModal] = useState(false);
 const [showLiquideDFModal, setShowLiquideDFModal] = useState(false);
 const [showLiquideDGModal, setShowLiquideDGModal] = useState(false);
    const [vapes, setVapes] = useState([]);
     const [services, setServices] = useState([]);
    const [accessoires, setAccessoires] = useState([]);
    const [allLiquides, setAllLiquides] = useState([]);
    const [liquideFruite, setLiquideFruite] = useState([]);
    const [liquideGourmand, setLiquideGourmand] = useState([]);
    const [gourmandDose, setGourmandDose] = useState([]);
    const [fruiteDose, setFruiteDose] = useState([]);
    const [produits, setProduits] = useState({
  vapes: { totalProduits: 0, quantiteStock: 0, quantiteVendue: 0 },
  accessoires: { totalProduits: 0, quantiteStock: 0, quantiteVendue: 0 },
  liquides: {
  totalProduits: 0,
  quantiteStock: 0,
  quantiteVendue: 0,
  bouteilleGourmand: {
    totalProduits: 0,
    quantiteStock: 0,
    quantiteVendue: 0
  },
  bouteilleFruite: {
    totalProduits: 0,
    quantiteStock: 0,
    quantiteVendue: 0
  },
  doseGourmand: {
    totalProduits: 0,
    quantiteStock: 0,
    quantiteVendue: 0
  },
  doseFruite: {
    totalProduits: 0,
    quantiteStock: 0,
    quantiteVendue: 0
  }
            },
  services: {totalServices:0}
});


const fetchServices = async () => {
    try {
         const response = await axios.get('http://localhost:5000/api/services', {
      withCredentials: true,
    });
      setServices(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des services', err);
    }
  };
const fetchLiquide = async () => {
  try {
    
    const response = await axios.get('http://localhost:5000/api/liquides/filter', {
      withCredentials: true,
    });

    const {
      liquides,
      fruiteDose,        
      fruiteBouteille,    
      gourmandDose,         
      gourmandBouteille 
    } = response.data;

    setAllLiquides(liquides);
    setLiquideFruite(fruiteBouteille);
    setLiquideGourmand(gourmandBouteille);
    setFruiteDose(fruiteDose);
    setGourmandDose(gourmandDose);

  } catch (err) {
    console.error('Erreur lors du chargement des liquides', err);
  }
};

const fetchAccessoires = async () => {
    try {
       
      const response = await axios.get('http://localhost:5000/api/accessoires', {
      withCredentials: true,
    });
      setAccessoires(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des accessoires', err);
    }
  };
const fetchVapes = async () => {
    try {
       
      const response = await axios.get('http://localhost:5000/api/vapes', {
      withCredentials: true,
    });
      setVapes(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des vapes', err);
    }
  };
const fetchstatistique = async () => {
    try {
     const response = await axios.get('http://localhost:5000/api/statistiques/nbProduits', {
       withCredentials: true,
    });
      setProduits(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques', err);
    }
  };
  useEffect(() => {
    fetchVapes();
    fetchLiquide();
    fetchAccessoires();
    fetchServices();
    fetchstatistique();
  }, []);
  return (
    <>
      <Navbar />
     
   <div class="overview">
                <sec-tion >
      <div className="contain-er">
        
        <Clock />
      </div>
    </sec-tion>
    <div class="car-ds">
                    <div class="card card-1" onClick={() => setShowVapeModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Liste Vapes</h5>
                                <h1>{produits.vapes.totalProduits}</h1>
                            </div>
                            <img src={vapeIcon} className="-icons" alt="Vape Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>Total :{produits.vapes.quantiteVendue + produits.vapes.quantiteStock}</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>Vendus :{produits.vapes.quantiteVendue}</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i> En Stock : {produits.vapes.quantiteStock}</span>
                        </div>
                    </div>
                    <VenteVapeModal show={showVapeModal} vapes={vapes} onHide={() => setShowVapeModal(false)} OnVente={fetchVapes} />

               
                    <div class="card card-3" onClick={() => setShowAccessoireModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Liste Accessoires</h5>
                               <h1>{produits.accessoires.totalProduits}</h1>
                            </div>
                            <img src={accessoireIcon} className="-icons" alt="Accessoire Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>Total :{produits.accessoires.quantiteVendue + produits.accessoires.quantiteStock}</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>Vendus :{produits.accessoires.quantiteVendue}</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i> En Stock : {produits.accessoires.quantiteStock}</span>
                        </div>
                    </div>
                    <VenteAccessoireModal show={showAccessoireModal} accessoires={accessoires} onHide={() => setShowAccessoireModal(false)} OnVente={fetchAccessoires} />

                    <div class="card card-4" onClick={() => setShowServiceModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Services</h5>
                                <h1>{produits.services.totalServices}</h1>
                            </div>
                            <img src={serviceIcon} className="-icons" alt="service Icon" />
                        </div>
                        
                    </div>
                </div>
   
                    <h2 class="section-title" >Liquides <span style={{color:'#f1d243'}}>Bouteille</span></h2>
                    
                
                <div class="car-ds">
                    <div class="card card-2" onClick={() => setShowLiquideBFModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Liste Fruité</h5>
                               <h1>{produits.liquides?.bouteilleFruite?.totalProduits || 0}</h1>
                            </div>
                            <img src={fruiteBIcon} className="-icons" alt="Vape Icon" />
                        </div>
                       <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>Total :{produits.liquides?.bouteilleFruite?.quantiteVendue || 0 + produits.liquides?.bouteilleFruite?.quantiteStock || 0}</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>Vendus :{produits.liquides?.bouteilleFruite?.quantiteVendue || 0}</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i> En Stock : {produits.liquides?.bouteilleFruite?.quantiteStock || 0}</span>
                        </div>
                    </div>
                    <VenteLiquideBFModal show={showLiquideBFModal} liquides={liquideFruite} onHide={() => setShowLiquideBFModal(false)} OnVente={fetchLiquide}/>

                    <div class="card card-2" onClick={() => setShowLiquideBGModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Liste Gourmand</h5>
                                 <h1>{produits.liquides?.bouteilleGourmand?.totalProduits || 0}</h1>
                            </div>
                            <img src={gourmandBIcon} className="-icons" alt="Liquide Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>Total :{produits.liquides?.bouteilleGourmand?.quantiteVendue || 0 + produits.liquides?.bouteilleGourmand?.quantiteStock || 0}</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>Vendus :{produits.liquides?.bouteilleGourmand?.quantiteVendue || 0}</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i> En Stock : {produits.liquides?.bouteilleGourmand?.quantiteStock || 0}</span>
                        </div>
                    </div>
                    <VenteLiquideBGModal show={showLiquideBGModal} liquides={liquideGourmand} onHide={() => setShowLiquideBGModal(false)} OnVente={fetchLiquide}/>

                </div>
                  <h2 class="section-title" >Liquides <span style={{color:'#e65100'}}>Dose</span></h2>
                    
                
                <div class="car-ds">
                    <div class="card card-2-2" onClick={() => setShowLiquideDFModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Fruité</h5>
                                 <h1>{produits.liquides?.doseFruite?.totalProduits || 0}</h1>
                            </div>
                            <img src={fruiteIcon} className="-icons" alt="Vape Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>Total :{produits.liquides?.doseFruite?.quantiteVendue || 0 + produits.liquides?.doseFruite?.quantiteStock || 0}</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>Vendus :{produits.liquides?.doseFruite?.quantiteVendue || 0}</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i> En Stock : {produits.liquides?.doseFruite?.quantiteStock || 0}</span>
                        </div>
                    </div>
                    <VenteLiquideDFModal show={showLiquideDFModal} liquides={fruiteDose} onHide={() => setShowLiquideDFModal(false)} OnVente={fetchLiquide}/>

                    <div class="card card-2-2" onClick={() => setShowLiquideDGModal(true)}>
                        <div class="card--data">
                            <div class="card--content">
                                <h5 class="card--title">Gourmand</h5>
                                 <h1>{produits.liquides?.doseGourmand?.totalProduits || 0}</h1>
                            </div>
                            <img src={gourmandIcon} className="-icons" alt="Liquide Icon" />
                        </div>
                        <div class="card--stats">
                            <span><i class="ri-bar-chart-fill card--icon stat--icon"></i>Total :{produits.liquides?.doseGourmand?.quantiteVendue || 0 + produits.liquides?.doseGourmand?.quantiteStock || 0}</span>
                            <span><i class="ri-arrow-up-s-fill card--icon up--arrow"></i>Vendus :{produits.liquides?.doseGourmand?.quantiteVendue || 0}</span>
                            <span><i class="ri-arrow-down-s-fill card--icon down--arrow"></i> En Stock : {produits.liquides?.doseGourmand?.quantiteStock || 0}</span>
                        </div>
                    </div>
                    <VenteLiquideDGModal show={showLiquideDGModal} liquides={gourmandDose} onHide={() => setShowLiquideDGModal(false)} OnVente={fetchLiquide}/>

                </div>
            </div>
            <ServiceModal show={showServiceModal}  onHide={() => setShowServiceModal(false)} OnVente={fetchServices}/>

     
    </>
  );
};

export default Home;
