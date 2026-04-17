package com.tek.order.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tek.order.entity.OrderEntity;
import com.tek.order.entity.User;
@Repository
public interface OrderRepository extends CrudRepository<OrderEntity, Integer>{
	List<OrderEntity> findByUser(User user);
}