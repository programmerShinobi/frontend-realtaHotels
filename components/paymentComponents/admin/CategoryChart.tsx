import { Card, Container, Text } from "@nextui-org/react";
import styles from "@/styles/chartCards.module.css";
import { DonutChart } from "@tremor/react";

export default function CategoryChart({ data, name }: {
    data: any[]
    name: string
}) {
    const cities = [
        {
            name: 'New York',
            sales: 9800,
        },
        {
            name: 'London',
            sales: 4567,
        },
        {
            name: 'Hong Kong',
            sales: 3908,
        },
        {
            name: 'San Francisco',
            sales: 2400,
        },
        {
            name: 'Singapore',
            sales: 1908,
        },
        {
            name: 'Zurich',
            sales: 1398,
        },
    ];

    const valueFormatter = (number: number) => (
        `$ ${Intl.NumberFormat('us').format(number).toString()}`
    );

    return (
        <Container className={styles.container}>
            <Card variant="bordered">
                <Card.Header className={styles.header}>
                    <Text>
                        Total {name}
                    </Text>
                </Card.Header>
                <Card.Body className={styles.body}>
                    <DonutChart
                        data={data}
                        category="credit"
                        dataKey="transactionType"
                        valueFormatter={valueFormatter}
                        marginTop="mt-6"
                        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                    />
                </Card.Body>
            </Card>
        </Container>
    )
}