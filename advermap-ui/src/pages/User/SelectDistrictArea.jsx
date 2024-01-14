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
import {DistrictService} from "../../services/district/DistrictService";

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

function getStyles(id, districtIds, theme) {
    return {
        fontWeight:
            districtIds.indexOf(id) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

DistrictsSelectBox.defaultProps = {
    name: '',
    existDistricts: []
};
DistrictsSelectBox.propTypes = {
    name: PropTypes.string.isRequired,
    existDistricts: PropTypes.array.isRequired,
    setManagement: PropTypes.func.isRequired,
};

function DistrictsSelectBox({name, existDistricts,setManagement}) {
    const theme = useTheme();
    const [districtIds, setDistrictIds] = React.useState(existDistricts);
    const {token, snackbar} = useSelector((state) => state.appState);

    const [districts, setDistricts] = React.useState([])

    useEffect(() => {
        if (!districts || districts.length == 0) {
            DistrictService.fetchWithParams(null, token).then(data => {
                setDistricts(data);
            });
        }
    }, []);
    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        console.log(value);
        setDistrictIds(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setManagement(typeof value === 'string' ? value.split(',') : value);
    };


    const renderDistrictBox = () => {

        if (districts && districts.length > 0) {
            return districts.map((w) => {
                return (
                    <MenuItem
                        key={w.id}
                        value={w.id}
                        style={getStyles(w.id, districtIds, theme)}
                    >
                        {w.name}
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
                value={districtIds}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Khu vực"/>}
                renderValue={(selected) => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => {
                            if (districts && districts.length > 0) {
                                for (let i = 0 ;i < districts.length;i++){
                                    if (districts[i].id== value ){
                                        return (<Chip key={value} label={districts[i].name}/>)
                                    }
                                }
                            }
                            return (<Chip key={value} label={value}/>)
                        })}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {renderDistrictBox()}
            </Select>
        </div>
    );
}

export default DistrictsSelectBox;