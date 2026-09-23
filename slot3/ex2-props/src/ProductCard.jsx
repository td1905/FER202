import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const ProductCard = ({ product }) => {
    const {
        name = 'Sản phẩm chưa đặt tên',
        price,
        image,
        rating,
        category,
    } = product ?? {};

    const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
    const categoryName = category?.name ?? 'Chưa phân loại';
    const rateScore = rating?.rate ?? 'Chưa có';
    const rateCount = rating?.count ?? 0;
    const formattedPrice =
        price !== undefined
            ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            : 'Liên hệ';

    return (
        <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={imageSrc} alt={name} />
            <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                    <Badge bg="info">{categoryName}</Badge>
                </div>
                <Card.Title className="fs-6">{name}</Card.Title>
                <Card.Text className="text-danger fw-bold fs-5 mt-auto mb-1">
                    {formattedPrice}
                </Card.Text>
                <Card.Text className="text-muted small">
                    ⭐ {rateScore} ({rateCount} đánh giá)
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;