import React from 'react'
import PropTypes from 'prop-types'

type PolicyCardProps = {
    icon: any,
    name: string,
    description: string
}

const PolicyCard = (props: PolicyCardProps) => {
    return (
        <div className="policy-card">
            <div className="policy-card__icon">
                <i className={props.icon}></i>
            </div>
            <div className="policy-card__info">
                <div className="policy-card__info__name">
                    {props.name}
                </div>
                <div className="policy-card__info__description">
                    {props.description}
                </div>
            </div>
        </div>
    )
}

export default PolicyCard
