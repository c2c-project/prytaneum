export default function Test({ id }) {
    return <h1>Hello World {id}</h1>;
}

export async function getServerSideProps(ctx) {
    console.log(ctx);
    return {
        props: {
            id: ctx.params.id,
        },
    };
}
