//package com.example.config;
//
//import com.example.model.User;
//import org.springframework.amqp.core.Queue;
//import org.springframework.amqp.rabbit.connection.ConnectionFactory;
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.amqp.support.converter.DefaultJackson2JavaTypeMapper;
//import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
//import org.springframework.amqp.support.converter.MessageConverter;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Configuration
//public class RabbitConfig {
//    public static final String USER_REQUEST_QUEUE = "user.request";
//    public static final String USER_RESPONSE_QUEUE = "user.response";
//
//    // --- Queue 정의 ---
//    @Bean
//    public Queue userRequestQueue() {
//        return new Queue(USER_REQUEST_QUEUE);
//    }
//
//    @Bean
//    public Queue userResponseQueue() {
//        return new Queue(USER_RESPONSE_QUEUE);
//    }
//
//    // --- MessageConverter 정의 ---
//    @Bean
//    public MessageConverter jsonMessageConverter() {
//        Jackson2JsonMessageConverter converter = new Jackson2JsonMessageConverter();
//
//        DefaultJackson2JavaTypeMapper typeMapper = new DefaultJackson2JavaTypeMapper();
//        typeMapper.setTrustedPackages("*"); // 신뢰할 패키지 지정
//
//        Map<String, Class<?>> idClassMapping = new HashMap<>();
//        idClassMapping.put("user", User.class); // __TypeId__가 "user"면 User.class로 변환
//        typeMapper.setIdClassMapping(idClassMapping);
//
//        converter.setJavaTypeMapper(typeMapper);
//        return converter;
//    }
//
//    // --- RabbitTemplate 정의 (RPC용) ---
//    @Bean
//    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
//        RabbitTemplate template = new RabbitTemplate(connectionFactory);
//        template.setMessageConverter(jsonMessageConverter());
//        template.setReplyTimeout(5000); // 5초 동안 응답 대기
//        return template;
//    }
//}
