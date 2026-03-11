package lru;

import java.util.*;

class LRUCache<K,V> extends LinkedHashMap<K,V> {

    private int capacity;
    
    LRUCache(int capacity) {
        super(capacity, 0.75F, true);
        this.capacity = capacity;
    }
    protected boolean removeEldestEntry(Map.Entry<K,V> eldest) {
        return (size() > capacity);
    }
}

