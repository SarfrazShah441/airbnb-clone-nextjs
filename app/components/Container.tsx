'use client';

interface ContainerPops {
    children: React.ReactNode;
}


const Container: React.FC<ContainerPops> = ({
    children
}) => {
    return (
        <div
            className="
            max-w-[2520px]
            mx-auto
            xl:px-20
            sm:px-10
            px-4
        "
        >
            {children}
        </div>
     );
}
 
export default Container;