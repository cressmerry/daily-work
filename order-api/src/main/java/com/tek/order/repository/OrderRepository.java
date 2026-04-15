package com.tek.order.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tek.order.entity.OrderEntity;
@Repository
public interface OrderRepository extends CrudRepository<OrderEntity, Integer>{

}