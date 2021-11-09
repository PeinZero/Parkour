import {useState} from 'react'
import ParkerMap from '../../components/ParkerMap'
import PMap from '../../components/PMap'

const ParkerHome: React.FC = () => {
    const [mapCenter, setMapCenter] = useState({
        lat:24.8607,
        lng: 67.0011,
    })
    
    const [mapZoom, setMapZoom] = useState(13)

    return (
        <div>
            {/* <PMap center = {mapCenter} zoom = {mapZoom}/> */}
            <ParkerMap />
        </div>
    );
}

export default ParkerHome;
