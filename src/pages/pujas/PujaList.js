import React, { useEffect, useState } from 'react';
import Puja from "../../models/Puja";
import { APIs } from "../../APIs/API";
import { setPujas } from "../../actions/puja.actions";
import PujaCard from '../../components/Puja/PujaCard';
import { connect } from 'react-redux';

const PujaList = (props) => {
    const { pujas, onSelectPuja, onSeeMore, setPujas } = props;
    const [page, setPage] = useState('1')

    useEffect(() => {
        try {
            APIs.getPujas().then(resp => {
                const pujas = resp.data.map(puja => {
                    return new Puja(puja)
                })
                setPujas(pujas)
            })
        } catch (error) {
            throw error
        }
    },[page]);
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {pujas.map((puja, i) => {
                return <PujaCard onSeeMore={() => onSeeMore(puja)} key={`${i}_jkn`} onBook={onSelectPuja} puja={puja}></PujaCard>
            })}
        </div>

    );
}
const mapStateToProps = state => ({
    pujas: state.pujas.availablePujas
})

const mapDispatchToProps = dispatch => ({
    setPujas: pujas => dispatch(setPujas(pujas))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PujaList)