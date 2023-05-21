package com.challenge.backend.dto;

import java.util.List;

public class NoteRequest {
    private String title;
    private String content;
    private boolean archived;
    private List<String> categories;

    public NoteRequest() {}

    public NoteRequest(String title, String content, List<String> categories) {
        this.title = title;
        this.content = content;
        this.categories = categories;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public boolean isArchived() {
        return archived;
    }
    public void setArchived(boolean archived) {
        this.archived = archived;
    }
    public List<String> getCategories() {
        return categories;
    }
    public void setCategories(List<String> categories) {
        this.categories = categories;
    }
}
