package com.tek.order.security.jwt;

import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import com.tek.order.service.UserDetailsImplementation;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.nio.charset.StandardCharsets;

@Component
public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	
	@Value("${com.tek.security.jwt.jwtSecret}")
	private String jwtSecret;
	
	@Value("${com.tek.security.jwt.jwtExpirationMs}")
	private int jwtExpirationMs;
	
	private Key getSigningKey() {
		byte[] keyBytes = this.jwtSecret.getBytes(StandardCharsets.UTF_8);
		return Keys.hmacShaKeyFor(keyBytes);
	}	
	
	public String generateJwtToken(Authentication authentication) {
		UserDetailsImplementation userPrincipal = (UserDetailsImplementation) authentication.getPrincipal();

		return Jwts.builder()
				.setSubject((userPrincipal.getUsername()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(getSigningKey(), SignatureAlgorithm.HS512) 
				.compact();
	}
	
	public boolean validateJwtToken(String authToken) {
		try {
			// Universal 0.10.x / 0.11.x parser logic
			Jwts.parserBuilder()
				.setSigningKey(getSigningKey())
				.build()
				.parseClaimsJws(authToken);
			return true;
		} catch (Exception e) {
			logger.error("JWT Error: {}", e.getMessage());
		}
		return false;
	}
	
	public String getUsernameFromJwtToken(String authToken) {
		return Jwts.parserBuilder()
				.setSigningKey(getSigningKey())
				.build()
				.parseClaimsJws(authToken)
				.getBody()
				.getSubject();
	}
}