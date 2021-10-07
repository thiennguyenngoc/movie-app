import React from 'react'
import dolby from 'assets/images/dolby.png'
import christie from 'assets/images/christie.png'
import twoD from 'assets/images/2d.png'
import threeD from 'assets/images/3d3.png'
import '../../assets/TechnoIntro.scss'

export default function TechnoIntro() {
    return (
        <div className='d-flex techno'>
            <img src={dolby} />
            <img src={christie} />
            <img src={twoD} />
            <img src={threeD} />
        </div>
    )
}
