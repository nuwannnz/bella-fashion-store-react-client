import React, { useMemo, useState, useEffect, useCallback } from 'react'
import '../../styles/ProductFilterBar.css'
import Checkbox, { ColorCheckbox } from '../common/Checkbox';

export const SORT_TYPE = {
    PRICE_LOW_TO_HIGH: 'PRICE_LOW_TO_HIGH',
    PRICE_HIGH_TO_LOW: 'PRICE_HIGH_TO_LOW'
}

export default function ProductFilterBar({ productList = [], onfilterListChanged }) {

    const [filterList, setFilterList] = useState({
        size: [],
        color: [],
        brand: [],
        sort: null
    })

    const sizes = useMemo(() => {
        const _sizes = [];
        productList.forEach(p => {
            p.sizeQty.forEach(s => {

                _sizes.push(s.size);

            })
        })
        return [...new Set(_sizes)];
    }, [productList]);

    const colors = useMemo(() => {
        const _colors = [];
        productList.forEach(p => _colors.push(p.colors));
        return [...new Set(_colors)]
    }, [productList]);

    const brands = useMemo(() => {
        const _brands = [];
        productList.forEach(p => _brands.push(p.brand));
        return [...new Set(_brands)];
    }, [productList]);


    const handleColorFilterChanged = (newColorFilter) => {
        setFilterList({ ...filterList, color: newColorFilter });
    }

    const handleSizeFilterChanged = (newSizeFilter) => {
        setFilterList({ ...filterList, size: newSizeFilter })
    }

    const handleBrandFilterChanged = (newBrandFilter) => {
        setFilterList({ ...filterList, brand: newBrandFilter })
    }



    useEffect(() => {
        onfilterListChanged(filterList);
    }, [filterList, onfilterListChanged])


    return (
        <div className="filter-bar-wrapper">
            <div className="filter-bar">
                <SizeFilter sizeList={sizes} sizeFilterListChangeHandler={handleSizeFilterChanged} />
                <ColorFilter colorList={colors} colorFilterListChangeHandler={handleColorFilterChanged} />
                <BrandFilter brandList={brands} brandFilterListChangeHandler={handleBrandFilterChanged} />
                <SortFilter />
            </div>
        </div>
    )
}


function SizeFilter({ sizeList = [], sizeFilterListChangeHandler, expanded = false }) {
    const [opened, setOpened] = useState(expanded)
    const [selectedSizes, setSelectedSizes] = useState([])

    useEffect(() => {
        if (sizeFilterListChangeHandler) {
            sizeFilterListChangeHandler(selectedSizes);
        }
    }, [selectedSizes])
    return (
        <div className={`filter ${opened && 'opened'}`} >
            <div className="filter-lable">
                <span><i className="fas fa-cut"></i></span>
                <span>Size</span>
            </div>
            <div className="filter-content">
                {
                    sizeList.map((size, i) =>
                        <Checkbox key={i} text={size}
                            onCheck={(checked) => {
                                if (checked) {
                                    setSelectedSizes([...selectedSizes, size])
                                } else {
                                    setSelectedSizes([...selectedSizes.filter(s => s !== size)])
                                }

                            }}
                        />)
                }
            </div>
        </div>
    )
}

function ColorFilter({ colorList = [], colorFilterListChangeHandler, expanded = false }) {
    const [opened, setOpened] = useState(expanded)
    const [selectedColors, setSelectedColors] = useState([])

    useEffect(() => {
        if (colorFilterListChangeHandler) {
            colorFilterListChangeHandler(selectedColors);
        }
    }, [selectedColors])

    return (
        <div className={`filter ${opened && 'opened'}`} onClick={() => setOpened(!opened)}>
            <div className="filter-lable">
                <span><i className="fas fa-tint"></i></span>
                <span>Color</span>
            </div>
            <div className="filter-content d-flex">
                {
                    colorList.map((color, i) => <ColorCheckbox key={i} color={color}
                        onCheck={(checked) => {
                            if (checked) {
                                setSelectedColors([...selectedColors, color])
                            } else {
                                setSelectedColors([...selectedColors.filter(c => c !== color)])
                            }
                        }}
                    />)
                }
            </div>
        </div>
    )
}


function BrandFilter({ brandList = [], brandFilterListChangeHandler, expanded = false }) {
    const [opened, setOpened] = useState(expanded)
    const [selectedBrands, setSelectedBrands] = useState([])

    useEffect(() => {
        if (brandFilterListChangeHandler) {
            brandFilterListChangeHandler(selectedBrands);
        }
    }, [selectedBrands])
    return (
        <div className={`filter ${opened && 'opened'}`} onClick={() => setOpened(!opened)}>
            <div className="filter-lable">
                <span><i className="fas fa-copyright"></i></span>
                <span>Brand</span>
            </div>
            <div className="filter-content">
                {
                    brandList.map((brand, i) => <Checkbox key={i} text={brand}
                        onCheck={(checked) => {
                            if (checked) {

                                setSelectedBrands([...selectedBrands, brand]);
                            } else {
                                setSelectedBrands([...selectedBrands.filter(b => b !== brand)])
                            }
                        }}
                    />)
                }
            </div>
        </div>
    )
}

function SortFilter({ sortFilterChangeHandler, expanded = false }) {
    const [opened, setOpened] = useState(expanded)
    return (
        <div className={`filter ${opened && 'opened'}`} onClick={() => setOpened(!opened)}>
            <div className="filter-lable">
                <span><i class="fas fa-sort-amount-up-alt"></i></span>
                <span>Sort</span>
            </div>
            <div className="filter-content">

                <Checkbox text="Price Low to High" />
                <Checkbox text="Price High to Low" />

            </div>
        </div>
    )
}



