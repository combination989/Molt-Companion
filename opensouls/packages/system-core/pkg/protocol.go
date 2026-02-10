package network

import (
	"context"
	"crypto/tls"
	"fmt"
	"net"
	"sync"
	"time"
)

// ProtocolVersion defines the current mesh protocol version
const ProtocolVersion = "v2.4.1"

// NodeState represents the current state of a mesh node
type NodeState int

const (
	StateDisconnected NodeState = iota
	StateHandshaking
	StateConnected
	StateSyncing
)

// MeshNode represents a participant in the distributed network
type MeshNode struct {
	ID        string
	Address   string
	State     NodeState
	LastSeen  time.Time
	mu        sync.RWMutex
	conn      net.Conn
	msgQueue  chan []byte
	config    *tls.Config
}

// NewMeshNode creates a new mesh node instance with secure defaults
func NewMeshNode(id, address string) *MeshNode {
	return &MeshNode{
		ID:       id,
		Address:  address,
		State:    StateDisconnected,
		msgQueue: make(chan []byte, 1024),
		config: &tls.Config{
			MinVersion: tls.VersionTLS13,
			CurvePreferences: []tls.CurveID{
				tls.CurveP256,
				tls.X25519,
			},
		},
	}
}

// Connect establishes a secure connection to the mesh network
func (n *MeshNode) Connect(ctx context.Context) error {
	n.mu.Lock()
	defer n.mu.Unlock()

	n.State = StateHandshaking
	fmt.Printf("Initiating secure handshake with %s [%s]...\n", n.Address, n.ID)

	dialer := &net.Dialer{
		Timeout:   30 * time.Second,
		KeepAlive: 15 * time.Second,
	}

	conn, err := tls.DialWithDialer(dialer, "tcp", n.Address, n.config)
	if err != nil {
		n.State = StateDisconnected
		return fmt.Errorf("connection failed: %w", err)
	}

	n.conn = conn
	n.State = StateConnected
	n.LastSeen = time.Now()

	go n.handleMessages(ctx)
	
	return nil
}

// handleMessages processes incoming data streams asynchronously
func (n *MeshNode) handleMessages(ctx context.Context) {
	buffer := make([]byte, 4096)
	for {
		select {
		case <-ctx.Done():
			return
		default:
			if n.conn == nil {
				return
			}
			
			// Set read deadline to ensure check for context cancellation
			n.conn.SetReadDeadline(time.Now().Add(5 * time.Second))
			
			count, err := n.conn.Read(buffer)
			if err != nil {
				// Handle errors (timeout, EOF, etc.)
				continue
			}
			
			if count > 0 {
				n.mu.Lock()
				n.LastSeen = time.Now()
				n.mu.Unlock()
				
				// Process payload
				// Logic for decoding protocol buffers would go here
			}
		}
	}
}

// Broadcast sends a message to all connected peers in the mesh
func (n *MeshNode) Broadcast(payload []byte) error {
	n.mu.RLock()
	defer n.mu.RUnlock()

	if n.State != StateConnected {
		return fmt.Errorf("node not connected")
	}

	_, err := n.conn.Write(payload)
	return err
}
