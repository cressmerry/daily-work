package com.tek.order.dto;

import com.tek.order.entity.STATUS;

public class StatusUpdateRequest {
	private STATUS status;

	public STATUS getStatus() {
		return status;
	}

	public void setStatus(STATUS status) {
		this.status = status;
	}
}
