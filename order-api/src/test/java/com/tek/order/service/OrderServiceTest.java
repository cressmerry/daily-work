package com.tek.order.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.tek.order.entity.OrderEntity;
import com.tek.order.entity.STATUS;
import com.tek.order.repository.OrderRepository;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    private OrderEntity testOrder;

    @BeforeEach
    void setUp() {
        testOrder = new OrderEntity();
        testOrder.setId(1);
        testOrder.setStatus(STATUS.CREATED);
    }

    @Test
    void testGetOrderByIdForSuccessfullFetch() {
        when(orderRepository.findById(1)).thenReturn(Optional.of(testOrder));
        Optional<OrderEntity> result = orderService.getOrderById(1);
        assertTrue(result.isPresent());
        assertEquals(1, result.get().getId());
        verify(orderRepository, times(1)).findById(1);
    }

    @Test
    void testGetOrdersForSuccessfullFetch() {
        List<OrderEntity> orders = Arrays.asList(new OrderEntity(), new OrderEntity());
        when(orderRepository.findAll()).thenReturn(orders);
        Iterable<OrderEntity> result = orderService.getOrders();
        assertNotNull(result);
        long size = StreamSupport.stream(result.spliterator(), false).count();
        assertEquals(2, size);
        verify(orderRepository, times(1)).findAll();
    }

    @Test
    void testDeleteOrderForSuccessfulDeletion() {
        Integer orderId = 1;
        orderService.deleteOrderById(orderId);
        verify(orderRepository, times(1)).deleteById(orderId);
    }

    @Test
    void testUpdateOrderStatusForSuccessfullUpdate() {
        when(orderRepository.findById(1)).thenReturn(Optional.of(testOrder));
        when(orderRepository.save(any(OrderEntity.class))).thenReturn(testOrder);
        OrderEntity updatedOrder = orderService.updateOrderStatus(1, STATUS.IN_TRANSIT);
        assertNotNull(updatedOrder);
        assertEquals(STATUS.IN_TRANSIT, updatedOrder.getStatus());
        verify(orderRepository, times(1)).findById(1);
        verify(orderRepository, times(1)).save(any(OrderEntity.class));
        updatedOrder = orderService.updateOrderStatus(1, STATUS.DELIVERED);
        assertNotNull(updatedOrder);
        assertEquals(STATUS.DELIVERED, updatedOrder.getStatus());
        verify(orderRepository, times(2)).findById(1);
        verify(orderRepository, times(2)).save(any(OrderEntity.class));
    }

    @Test
    void testUpdateOrderStatusForInvalidOrder() {
        when(orderRepository.findById(99999)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> {
            orderService.updateOrderStatus(99, STATUS.DELIVERED);
        });
        verify(orderRepository, never()).save(any());
    }
    
    @Test
    void testUpdateOrderStatusForInvalidTransition() {
        testOrder.setStatus(STATUS.IN_TRANSIT);
        when(orderRepository.findById(1)).thenReturn(Optional.of(testOrder));
        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            orderService.updateOrderStatus(1, STATUS.CREATED);
        });
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
        assertTrue(exception.getReason().contains("Invalid status transition"));
        verify(orderRepository, never()).save(any(OrderEntity.class));
    }
}