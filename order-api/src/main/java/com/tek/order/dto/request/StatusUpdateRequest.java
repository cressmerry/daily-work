package com.tek.order.dto.request;

import com.tek.order.entity.STATUS;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class StatusUpdateRequest {
	@NotBlank
	@NotNull
	private STATUS status;

	public STATUS getStatus() {
		return status;
	}

	public void setStatus(STATUS status) {
		this.status = status;
	}
}
