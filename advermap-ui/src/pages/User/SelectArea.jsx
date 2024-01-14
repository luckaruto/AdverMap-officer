import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {WardService} from "../../services/ward/WardService";
import PropTypes from "prop-types";
import CarouselImage from "../../components/Carousels/CarouselImage";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(id, wardIds, theme) {
    return {
        fontWeight:
            wardIds.indexOf(id) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

WardsSelectBox.defaultProps = {
    name: '',
    existWards: []
};
WardsSelectBox.propTypes = {
    name: PropTypes.string.isRequired,
    existWards: PropTypes.array.isRequired,
    setManagement: PropTypes.func.isRequired,
};

function WardsSelectBox({name, existWards,setManagement}) {
    const theme = useTheme();
    const [wardIds, setWardIds] = React.useState(existWards);
    const {token, snackbar} = useSelector((state) => state.appState);

    const [wards, setWards] = React.useState([])

    useEffect(() => {
        if (!wards || wards.length == 0) {
            WardService.fetchWithParams(null, token).then(data => {
                setWards(data);
            });
        }
    }, []);
    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        console.log(value);
        setWardIds(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setManagement(typeof value === 'string' ? value.split(',') : value);
    };


    const renderWardBox = () => {

        if (wards && wards.length > 0) {
            return wards.map((ward) => {
                return (
                    <MenuItem
                        key={ward.id}
                        value={ward.id}
                        style={getStyles(ward.id, wardIds, theme)}
                    >
                        {ward.name}
                    </MenuItem>)
            })
        } else {
            return (<></>)
        }
    }

    return (
        <div>
            <InputLabel id="ward-select">Khu vực quản lý</InputLabel>
            <Select
                name={name}
                multiple
                value={wardIds}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Khu vực"/>}
                renderValue={(selected) => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => {
                            if (wards && wards.length > 0) {
                                for (let i = 0 ;i < wards.length;i++){
                                    if (wards[i].id== value ){
                                        return (<Chip key={value} label={wards[i].name}/>)
                                    }
                                }
                            }
                            return (<Chip key={value} label={value}/>)
                        })}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {renderWardBox()}
            </Select>
        </div>
    );
}

export default WardsSelectBox;