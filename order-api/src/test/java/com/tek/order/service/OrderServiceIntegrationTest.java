package com.tek.order.service;

import com.tek.order.entity.Address;
import com.tek.order.entity.OrderEntity;
import com.tek.order.entity.OrderLine;
import com.tek.order.repository.OrderRepository;

import jakarta.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class OrderServiceIntegrationTest {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    public void testAddOrderPersistence() throws Exception {
        OrderEntity order = new OrderEntity();
        
        Address address = new Address();
        address.setStreet("456 Oak Ave");
        address.setCity("Seattle");
        address.setZipCode("98101");
        order.setShippingAddress(address);

        OrderLine line = new OrderLine();
        line.setItem("Mouse");
        line.setPrice(25.0f);
        line.setQuantity(1);

        order.setOrderLines(Collections.singletonList(line));

        Integer savedId = orderService.addOrder(order);

        assertNotNull(savedId);
        OrderEntity retrieved = orderRepository.findById(savedId).orElse(null);
        assertNotNull(retrieved);
        assertEquals("Seattle", retrieved.getShippingAddress().getCity());
        assertEquals(1, retrieved.getOrderLines().size());
        assertEquals(retrieved.getId(), retrieved.getOrderLines().get(0).getOrder().getId());
    }
}