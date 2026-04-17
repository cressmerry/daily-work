package com.tek.order.security.jwt;

import java.security.SignatureException;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.tek.order.service.UserDetailsImplementation;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.*;

@Component
public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	
	@Value("${com.tek.security.jwt.jwtSecret}")
	private String jwtSecret;
	
	@Value("${com.tek.security.jwt.jwtExpirationMs}")
	private int jwtExpirationMs;
	
	public String generateJwtToken(Authentication authentication) {
		UserDetailsImplementation userPrincipal = (UserDetailsImplementation) authentication.getPrincipal();
		
		return Jwts.builder()
				.setSubject((userPrincipal.getUsername()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
	}
	
	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		}
		catch(io.jsonwebtoken.SignatureException signatureException) {
			logger.error("Invalid JWT Signature: {}", signatureException.getMessage());
		}
		catch(MalformedJwtException malformedJwtException) {
			logger.error("Invalid JWT Token: {}", malformedJwtException.getMessage());
		}
		catch(ExpiredJwtException expiredJwtException) {
			logger.error("JWT token is expired: {}", expiredJwtException.getMessage());
		}
		catch(UnsupportedJwtException unsupportedJwtException){
			logger.error("JWT token is unsupported: {}", unsupportedJwtException.getMessage());
		}
		catch(IllegalArgumentException illegalArgumentException) {
			logger.error("JWT claims string is empty; {}", illegalArgumentException.getMessage());
		}
		return false;
	}
	
	public String getUsernameFromJwtToken(String authToken) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken).getBody().getSubject();
	}
	
	
}
