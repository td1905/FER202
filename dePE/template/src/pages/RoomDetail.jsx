import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Badge, Button, Spinner, Alert, ListGroup } from 'react-bootstrap'
import { fetchRoomById } from '../api/roomApi'
import { useRoom } from '../context/RoomContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function RoomDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useRoom()
  const { roomTypes } = state
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRoomById(id)
      .then((data) => { setRoom(data); setLoading(false) })
      .catch((err) => { setError(err.message || 'Failed to load room.'); setLoading(false) })
  }, [id])

  // TODO-05: Nếu loading → trả về Spinner
  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  // TODO-05: Nếu error → trả về Alert variant="danger"
  if (error) return <Alert variant="danger" role="alert">{error}</Alert>
  if (!room) return null

  const roomTypeName = roomTypes.find((rt) => String(rt.id) === String(room.roomTypeId))?.name ?? '—'

  return (
    <div>
      {<Button onClick={() => navigate(-1)}>← Back</Button>}
      <Card className="shadow-sm">
        <Card.Header as="h4">{room.name}</Card.Header>
        <Card.Body>
          <p>{formatVND(room.priceWeekday)}</p>
          <p>{formatVND(room.priceWeekend)}</p>
          <p>{formatDateDisplay(room.lastRenovated)}</p>
        </Card.Body>
      </Card>
    </div>
  )
}
