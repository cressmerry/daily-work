package com.tek.order.dto.event.request;

import com.tek.order.entity.STATUS;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class StatusUpdateRequest {
	@NotNull
	private STATUS status;

	public STATUS getStatus() {
		return status;
	}

	public void setStatus(STATUS status) {
		this.status = status;
	}
}
