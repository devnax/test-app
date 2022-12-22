import Layout from '@src/Partials/Layout'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material'
import Card from '@libs/Card'
import Image from 'next/image'


interface PaymentMethodCardProps {
    icon: string;
    title: string;
}

const PaymentMethodCard = ({ title, icon }: PaymentMethodCardProps) => {
    return <Stack
        borderRadius={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
            '& img': {
                width: 20
            }
        }}
    >
        <Stack direction="row" alignItems="center">
            <Radio />
            <Typography variant="h6" >{title}</Typography>
        </Stack>
        <Stack>
            <Image alt={title} src={icon} width={30} height={30} />
        </Stack>
    </Stack>
}


const PurchesPopup = () => {

    return (
        <Layout bgcolor="background.paper" title="Checkout">
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={6} p={2}>
                        <Box>
                            <Card
                                imageSize={100}
                                imagePadded
                                imageEffect={"none" as any}
                                title="IELTS Writing (AC)"
                                image="http://localhost:5000/uploads/2022/8/28/images/e6ced44a9b78759a54c8acfb366062b94206.webp"
                                inline
                                sx={{
                                    bgcolor: "transparent"
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            p={1}
                            mb={2}
                        >
                            <Typography variant="h6" >Amount</Typography>
                            <Typography variant="h6" >$20</Typography>
                        </Stack>
                        <Stack
                            spacing={1}
                            p={2}
                            border={1}
                            borderColor="divider"
                            borderRadius={2}
                        >
                            <Typography variant="h6" >Select Payment Method</Typography>
                            <Stack>
                                <PaymentMethodCard
                                    icon="/images/bkash-icon.jpg"
                                    title="Bkash"
                                />
                                <PaymentMethodCard
                                    icon="/images/paypal.png"
                                    title="Paypal"
                                />
                            </Stack>
                            <Button variant="contained" size="large">
                                $20 Pay
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default PurchesPopup