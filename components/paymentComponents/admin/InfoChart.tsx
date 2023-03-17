import { Card, Container, Text } from "@nextui-org/react";
import styles from "@/styles/chartCards.module.css"

export default function InfoChart({ data, name }: { data: any, name: string }) {
    return (
        <Card variant="bordered" className="w-10">
            <Card.Header className="py-0">
                <Text> Total {name} </Text>
            </Card.Header>
            <Card.Body className="pt-12">
                <Text size={52} b>
                    {name !== "Fintech" ? data : data.length}
                </Text>
            </Card.Body>
        </Card>
    )
}