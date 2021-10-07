import nextArrow from 'assets/images/arow-right.png'
import prevArrow from 'assets/images/arow-left.png'
import '../../../assets/MovieListAssets/Arrow.scss'

export const PrevArrow = ({ className, onClick, style }) => {
    return (
        <div className={className} onClick={onClick}>
            <img id='prevArr' src={prevArrow} />
        </div>
    )
}

export const NextArrow = ({ className, onClick, style }) => {
    return (
        <div className={className} onClick={onClick}>
            <img id='nextArr' src={nextArrow} />
        </div>
    )
}