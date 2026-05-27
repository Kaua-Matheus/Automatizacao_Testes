package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import com.demoapp.demo.model.UserPostReaction;
import com.demoapp.demo.repository.UserPostReactionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

class PostServiceTest {

  private UserPostReactionRepository reactionRepository;
  private RestTemplate restTemplate;
  private ObjectMapper objectMapper;
  private PostService postService;

  @BeforeEach
  void setup() {
    reactionRepository = mock(UserPostReactionRepository.class);
    restTemplate = mock(RestTemplate.class);
    objectMapper = new ObjectMapper();

    postService = new PostService(reactionRepository);

    // Inject mocks into PostService
    ReflectionTestUtils.setField(postService, "restTemplate", restTemplate);
    ReflectionTestUtils.setField(postService, "objectMapper", objectMapper);
  }

  // Simula o usuário curtir um post e o campo liked retornar como true
  @Test
  void getPosts_marksLikedWhenUserHasReaction() {
    UserPostReaction reaction = new UserPostReaction();
    reaction.setUserId(1L);
    reaction.setPostId(1L);

    when(reactionRepository.findByUserId(1L)).thenReturn(List.of(reaction));
    when(restTemplate.getForObject(eq("https://dummyjson.com/posts?limit=1&skip=0"), eq(String.class)))
        .thenReturn("""
          {
            "posts":[{"id":1,"title":"t1","body":"b1"}],
            "total":1,"skip":0,"limit":1
          }
        """);

    Map<String, Object> result = postService.getPosts(1, 0, 1L);
    List<Map<String, Object>> posts = (List<Map<String, Object>>) result.get("posts");

    assertEquals(true, posts.get(0).get("liked"));
  }

  // Simula o usuário não tem curtidas e o campo liked retornar como false
  @Test
  void getPosts_marksLikedFalseWhenUserHasNoReaction() {
    when(reactionRepository.findByUserId(1L)).thenReturn(List.of());
    when(restTemplate.getForObject(eq("https://dummyjson.com/posts?limit=1&skip=0"), eq(String.class)))
        .thenReturn("""
          {
            "posts":[{"id":1,"title":"t1","body":"b1"}],
            "total":1,"skip":0,"limit":1
          }
        """);

    Map<String, Object> result = postService.getPosts(1, 0, 1L);
    List<Map<String, Object>> posts = (List<Map<String, Object>>) result.get("posts");

    assertEquals(false, posts.get(0).get("liked"));
  }
}