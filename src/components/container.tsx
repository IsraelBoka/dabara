import classNames from "classnames"
export const Container =({children , classname} : {children : React.ReactNode, classname?: string}) => {
    return (
        <div className={classNames("max-w-6xl mx-auto ", classname)}>
            {children}
        </div>
    )
}
