package com.tek.order.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tek.order.dto.event.request.StatusUpdateRequest;
import com.tek.order.entity.Address;
import com.tek.order.entity.OrderEntity;
import com.tek.order.entity.OrderLine;
import com.tek.order.entity.STATUS;
import com.tek.order.service.OrderService;

@WebMvcTest(OrderController.class)
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private OrderService orderService;

    @Autowired
    private ObjectMapper objectMapper;

    private OrderEntity testOrder;
    private OrderLine testOrderLine;
    private Address testAddress;

    @BeforeEach
    public void setUp() {
        testAddress = new Address();
        testAddress.setStreet("123 Main St");
        testAddress.setCity("ABC City");
        testAddress.setZipCode("12345");

        testOrderLine = new OrderLine();
        testOrderLine.setId(1);
        testOrderLine.setItem("Laptop");
        testOrderLine.setPrice(999.99F);
        testOrderLine.setQuantity(1);

        testOrder = new OrderEntity();
        testOrder.setId(1);
        testOrder.setShippingAddress(testAddress);
        testOrder.setOrderLines(Arrays.asList(testOrderLine));
        testOrderLine.setOrder(testOrder);
    }


    @Test
    public void testGetOrderByIdForSuccessfulFetch() throws Exception {
        when(orderService.getOrderById(1)).thenReturn(Optional.of(testOrder));
        mockMvc.perform(get("/order/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.shippingAddress.street").value("123 Main St"))
                .andExpect(jsonPath("$.shippingAddress.city").value("ABC City"))
                .andExpect(jsonPath("$.orderLines[0].item").value("Laptop"))
                .andExpect(jsonPath("$.orderLines[0].price").value(999.99f))
                .andExpect(jsonPath("$.orderLines[0].quantity").value(1));
        verify(orderService, times(1)).getOrderById(1);
    }

    @Test
    public void testGetOrderByIdForNonExistentId() throws Exception {
        when(orderService.getOrderById(999)).thenReturn(Optional.empty());
        mockMvc.perform(get("/order/999")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
        verify(orderService, times(1)).getOrderById(999);
    }

    @Test
    public void testGetOrdersForSuccessfulFetchOfAllOrders() throws Exception {
        List<OrderEntity> orders = Arrays.asList(testOrder);
        when(orderService.getOrders()).thenReturn(orders);
        mockMvc.perform(get("/order")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].shippingAddress.street").value("123 Main St"))
                .andExpect(jsonPath("$.length()").value(1));
        verify(orderService, times(1)).getOrders();
    }

    @Test
    public void testGetOrdersForEmptyOrders() throws Exception {
        when(orderService.getOrders()).thenReturn(Arrays.asList());
        mockMvc.perform(get("/order")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", org.hamcrest.Matchers.hasSize(0)));
        verify(orderService, times(1)).getOrders();
    }


    @Test
    public void testCreateOrderForSuccessfullCreation() throws Exception {
        when(orderService.addOrder(any(OrderEntity.class))).thenReturn(1);
        mockMvc.perform(post("/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testOrder)))
                .andExpect(status().isCreated())
                .andExpect(content().string("1"));
        verify(orderService, times(1)).addOrder(any(OrderEntity.class));
    }

    @Test
    public void testCreateOrderForMissingShippingAddress() throws Exception {
        OrderEntity invalidOrder = new OrderEntity();
        invalidOrder.setOrderLines(Arrays.asList(testOrderLine));
        mockMvc.perform(post("/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidOrder)))
                .andExpect(status().isBadRequest());
        verify(orderService, never()).addOrder(any(OrderEntity.class));
    }

    @Test
    public void testCreateOrderForMissingOrderLines() throws Exception {
        OrderEntity invalidOrder = new OrderEntity();
        invalidOrder.setShippingAddress(testAddress);
        invalidOrder.setOrderLines(null);
        mockMvc.perform(post("/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidOrder)))
                .andExpect(status().isBadRequest());
        verify(orderService, never()).addOrder(any(OrderEntity.class));
    }

    @Test
    public void testCreateOrderForEmptyOrderLines() throws Exception {
        OrderEntity invalidOrder = new OrderEntity();
        invalidOrder.setShippingAddress(testAddress);
        invalidOrder.setOrderLines(Arrays.asList());
        mockMvc.perform(post("/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidOrder)))
                .andExpect(status().isBadRequest());
        verify(orderService, never()).addOrder(any(OrderEntity.class));
    }

    @Test
    public void testCreateOrderForMissingOrderLineItem() throws Exception {
        OrderLine invalidLine = new OrderLine();
        invalidLine.setPrice(100.0f);
        invalidLine.setQuantity(1);
        OrderEntity invalidOrder = new OrderEntity();
        invalidOrder.setShippingAddress(testAddress);
        invalidOrder.setOrderLines(Arrays.asList(invalidLine));
        mockMvc.perform(post("/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidOrder)))
                .andExpect(status().isBadRequest());

        verify(orderService, never()).addOrder(any(OrderEntity.class));
    }

    @Test
    public void testCreateOrderForInvalidOrderLinePrice() throws Exception {
        OrderLine invalidLine = new OrderLine();
        invalidLine.setItem("Product");
        invalidLine.setPrice(-12345);
        invalidLine.setQuantity(1);
        OrderEntity invalidOrder = new OrderEntity();
        invalidOrder.setShippingAddress(testAddress);
        invalidOrder.setOrderLines(Arrays.asList(invalidLine));
        mockMvc.perform(post("/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidOrder)))
                .andExpect(status().isBadRequest());

        verify(orderService, never()).addOrder(any(OrderEntity.class));
    }

    @Test
    public void testCreateOrderForInvalidOrderLineQuantity() throws Exception {
        OrderLine invalidLine = new OrderLine();
        invalidLine.setItem("Product");
        invalidLine.setPrice(50.0f);
        OrderEntity invalidOrder = new OrderEntity();
        invalidOrder.setShippingAddress(testAddress);
        invalidOrder.setOrderLines(Arrays.asList(invalidLine));
        mockMvc.perform(post("/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidOrder)))
                .andExpect(status().isBadRequest());

        verify(orderService, never()).addOrder(any(OrderEntity.class));
    }

    @Test
    public void testCreateOrderForMissingAddressStreet() throws Exception {
        Address invalidAddress = new Address();
        invalidAddress.setCity("ABC City");
        invalidAddress.setZipCode("12345");
        OrderEntity invalidOrder = new OrderEntity();
        invalidOrder.setShippingAddress(invalidAddress);
        invalidOrder.setOrderLines(Arrays.asList(testOrderLine));
        mockMvc.perform(post("/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidOrder)))
                .andExpect(status().isBadRequest());
        verify(orderService, never()).addOrder(any(OrderEntity.class));
    }

    @Test
    public void testCreateOrderForMultipleOrderLines() throws Exception {
        OrderLine line2 = new OrderLine();
        line2.setId(2);
        line2.setItem("Mouse");
        line2.setPrice(29.99f);
        line2.setQuantity(2);
        OrderEntity multiLineOrder = new OrderEntity();
        multiLineOrder.setId(1);
        multiLineOrder.setShippingAddress(testAddress);
        multiLineOrder.setOrderLines(Arrays.asList(testOrderLine, line2));
        when(orderService.addOrder(any(OrderEntity.class))).thenReturn(1);
        mockMvc.perform(post("/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(multiLineOrder)))
                .andExpect(status().isCreated())
                .andExpect(content().string("1"));
        verify(orderService, times(1)).addOrder(any(OrderEntity.class));
    }


    @Test
    public void testDeleteOrderByIdForSuccessfulDeletion() throws Exception {
        doNothing().when(orderService).deleteOrderById(1);
        mockMvc.perform(delete("/order/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
        verify(orderService, times(1)).deleteOrderById(1);
    }

    @Test
    public void testDeleteOrderByIdForNonExistentId() throws Exception {
        doNothing().when(orderService).deleteOrderById(999);
        mockMvc.perform(delete("/order/999")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
        verify(orderService, times(1)).deleteOrderById(999);
    }

    @Test
    public void testDeleteOrderByIdForInvalidId() throws Exception {
        mockMvc.perform(delete("/order/invalid")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
    
    @Test
    public void testUpdateStatusForSuccess() throws Exception {
        testOrder.setStatus(STATUS.IN_TRANSIT);
        StatusUpdateRequest request = new StatusUpdateRequest();
        request.setStatus(STATUS.IN_TRANSIT);
        when(orderService.updateOrderStatus(eq(1), any(STATUS.class))).thenReturn(testOrder);
        mockMvc.perform(patch("/order/1/status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("IN_TRANSIT"));
        verify(orderService, times(1)).updateOrderStatus(eq(1), eq(STATUS.IN_TRANSIT));
    }
}
