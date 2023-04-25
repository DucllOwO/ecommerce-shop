import React from 'react'

type HelmetType = {
    title: string,
    children: React.ReactNode,
}

const Helmet = (props: HelmetType) => {

    document.title = 'Yolo - ' + props.title

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            {props.children}
        </div>
    )
}

export default Helmet
