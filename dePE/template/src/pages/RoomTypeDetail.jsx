import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap'
import { fetchRoomTypes, fetchRooms } from '../api/roomApi'
import { formatPriceRange } from '../utils/format'

export default function RoomTypeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [roomType, setRoomType] = useState(null)
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      const [roomTypes, allRooms] = await Promise.all([fetchRoomTypes(), fetchRooms()])
      const found = roomTypes.find((rt) => String(rt.id) === String(id))
      if (!found) {
        navigate('/not-found', { replace: true })
        return
      }
      setRoomType(found)
      setRooms(allRooms.filter((r) => String(r.roomTypeId) === String(id)))
      setLoading(false)

    }
    load()
  }, [id])

  // TODO-10A: Nếu loading → Spinner; nếu error → Alert danger
  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger" role="alert">{error}</Alert>
  if (!roomType) return null

  return (
    <div>
      <Button variant="secondary" className="mb-3" onClick={() => navigate('/room-types')}>
        ← Back to Room Types
      </Button>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="d-flex align-items-center gap-2">
            <span>{roomType.name}</span>
            <Badge bg="secondary">ID: {roomType.id}</Badge>
          </Card.Title>
          <Card.Text>Total Rooms: {rooms.length}</Card.Text>
        </Card.Body>
      </Card>
      <h5>Rooms</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Floor</th>
            <th>View</th>
            <th>Price Range</th>
            <th>Last Renovated</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={room.id}>
              <td>{index + 1}</td>
              <td>{room.name}</td>
              <td>{room.floor}</td>
              <td>{room.view}</td>
              <td>{formatPriceRange(room.priceWeekday, room.priceWeekend)}</td>
              <td>{room.lastRenovated}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
