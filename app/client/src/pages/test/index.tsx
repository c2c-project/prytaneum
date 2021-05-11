export default function Test() {
    return <h1>Hello World</h1>;
}

export async function getStaticProps(ctx) {
    console.log(ctx);
    return {
        props: {
            what: 'what',
        },
    };
}

