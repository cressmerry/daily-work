package com.tek.order.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.tek.order.entity.OrderEntity;
import com.tek.order.repository.OrderRepository;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    @Test
    @DisplayName("Should return order when a valid ID is provided")
    void testGetOrderByIdForSuccessfullFetch() {
        OrderEntity mockOrder = new OrderEntity();
        mockOrder.setId(1);
        when(orderRepository.findById(1)).thenReturn(Optional.of(mockOrder));
        Optional<OrderEntity> result = orderService.getOrderById(1);
        assertTrue(result.isPresent());
        assertEquals(1, result.get().getId());
        verify(orderRepository, times(1)).findById(1);
    }

    @Test
    @DisplayName("Should return all orders")
    void testgGetOrdersFoSuccessfullFetch() {
        List<OrderEntity> orders = Arrays.asList(new OrderEntity(), new OrderEntity());
        when(orderRepository.findAll()).thenReturn(orders);
        Iterable<OrderEntity> result = orderService.getOrders();
        assertNotNull(result);
        int size = 0;
        for (OrderEntity order : result) size++;
        assertEquals(2, size);
        verify(orderRepository, times(1)).findAll();
    }
    

    @Test
    @DisplayName("Should call delete on repository when deleting by ID")
    void testDeleteOrderForSuccessfulDeletion() {
        Integer orderId = 1;
        orderService.deleteOrderById(orderId);
        verify(orderRepository, times(1)).deleteById(orderId);
    }
}